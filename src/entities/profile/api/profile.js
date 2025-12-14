import { supabase } from "@/shared/api/supabase/client.js";

class UserProfile {
  async getProfile() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      if (userError) throw userError;
      return null;
    }

    const userId = user.id;

    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select(
          `
                    *,
                    fop_details (
                        edrpou,
                        country,
                        region,
                        city,
                        address
                    ),
                    legal_entity_details (
                        okpo,
                        country,
                        region,
                        city,
                        address,
                        postal_code
                    )
                `
        )
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Ошибка Supabase при получении профиля:", error);
        throw error;
      }

      return profile;
    } catch (e) {
      console.error("Ошибка в authApi.getProfile:", e);
      throw e;
    }
  }

  async updateProfile(newData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Необходимо авторизоваться для обновления профиля.");
    }

    const userId = user.id;

    const profilePayload = getProfilePayload(newData);
    const personType = newData.person_type;

    if (Object.keys(profilePayload).length > 0) {
      try {
        const { error } = await supabase
          .from("profiles")
          .update(profilePayload)
          .eq("id", userId);

        if (error) throw error;
      } catch (e) {
        console.error("Ошибка при обновлении таблицы 'profiles':", e);
        throw new Error("Не удалось обновить основные данные профиля.");
      }
    }

    let currentPersonType = personType;
    if (
      !currentPersonType &&
      (newData.edrpou || newData.okpo || newData.city)
    ) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("person_type")
        .eq("id", userId)
        .maybeSingle();

      if (profileData) {
        currentPersonType = profileData.person_type;
      }
    }

    if (currentPersonType === "fop") {
      const fopPayload = getDetailsPayload(newData, "fop");
      if (fopPayload) {
        try {
          const { error } = await supabase
            .from("fop_details")
            .upsert(
              { ...fopPayload, profile_id: userId },
              { onConflict: "profile_id" }
            );

          if (error) throw error;
        } catch (e) {
          console.error("Ошибка при upsert 'fop_details':", e);
          throw new Error("Не удалось обновить детали ФОП.");
        }
      }
    } else if (currentPersonType === "legal") {
      const legalPayload = getDetailsPayload(newData, "legal");
      if (legalPayload) {
        try {
          const { error } = await supabase
            .from("legal_entity_details")
            .upsert(
              { ...legalPayload, profile_id: userId },
              { onConflict: "profile_id" }
            );

          if (error) throw error;
        } catch (e) {
          console.error("Ошибка при upsert 'legal_entity_details':", e);
          throw new Error("Не удалось обновить детали юр.лица.");
        }
      }
    }

    return true;
  }
}

export const userProfileApi = new UserProfile();

const getProfilePayload = (data) => {
  const allowedKeys = [
    "full_name",
    "phone",
    "country",
    "region",
    "city",
    "address",
    "person_type",
    "avatar_url",
  ];
  return Object.keys(data).reduce((acc, key) => {
    if (allowedKeys.includes(key) && data[key] !== undefined) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};

const getDetailsPayload = (data, type) => {
  const fopKeys = ["edrpou", "country", "region", "city", "address"];
  const legalKeys = [
    "okpo",
    "country",
    "region",
    "city",
    "address",
    "postal_code",
  ];
  const allowedKeys = type === "fop" ? fopKeys : legalKeys;

  const idKey = type === "fop" ? "edrpou" : "okpo";

  const hasDetailsData = Object.keys(data).some(
    (key) => allowedKeys.includes(key) && data[key] !== undefined
  );

  if (!hasDetailsData) {
    return null;
  }

  return Object.keys(data).reduce((acc, key) => {
    if (allowedKeys.includes(key) && data[key] !== undefined) {
      if (key === "okpo" || key === "edrpou") {
        acc[idKey] = data[key];
      } else {
        acc[key] = data[key];
      }
    }
    return acc;
  }, {});
};
