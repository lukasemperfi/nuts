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
}

export const userProfileApi = new UserProfile();
