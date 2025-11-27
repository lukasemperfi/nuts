import { supabase } from "@/shared/api/supabase/client.js";

class Auth {
  onAuthChange(callback) {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        callback(event, session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }
  async login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return data;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return true;
  }

  async registerUser(data) {
    const {
      email,
      password,
      full_name,
      phone,
      person_type,
      upload_file,
      country,
      region,
      city,
      address,
    } = data;

    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (signUpError) {
      console.error("Ошибка регистрации в Auth:", signUpError.message);
      throw signUpError;
    }

    const userId = userData.user.id;
    let avatarUrl = null;

    if (upload_file && upload_file.name) {
      const fileExt = upload_file.name.split(".").pop();
      const filePath = `${userId}.${fileExt}`;

      const { error: uploadErr } = await supabase.storage
        .from("avatars")
        .upload(filePath, upload_file, {
          cacheControl: "no-cache",
          upsert: true,
        });

      if (uploadErr) {
        console.warn(
          "Предупреждение: Ошибка загрузки аватара, продолжение регистрации:",
          uploadErr.message
        );
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      avatarUrl = urlData.publicUrl;
    }

    const profileData = {
      id: userId,
      full_name: full_name,
      phone: phone,
      country: country || null,
      region: region || null,
      city: city || null,
      address: address || null,
      person_type: person_type,
      avatar_url: avatarUrl,
    };

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([profileData]);

    if (profileError) {
      console.error("Ошибка вставки в profiles:", profileError.message);
      throw profileError;
    }

    if (person_type === "fop" && data.fop) {
      const fopDetails = {
        profile_id: userId,
        edrpou: data.fop.edrpou,
        country: data.fop.country || null,
        region: data.fop.region || null,
        city: data.fop.city || null,
        address: data.fop.address || null,
      };

      const { error: fopError } = await supabase
        .from("fop_details")
        .insert([fopDetails]);

      if (fopError) {
        console.error("Ошибка вставки в fop_details:", fopError.message);
        throw fopError;
      }
    } else if (person_type === "legal" && data.legal_entity) {
      const legalDetails = {
        profile_id: userId,
        okpo: data.legal_entity.okpo,
        country: data.legal_entity.country || null,
        region: data.legal_entity.region || null,
        city: data.legal_entity.city || null,
        address: data.legal_entity.address || null,
        postal_code: data.legal_entity.postal_code || null,
      };

      const { error: legalError } = await supabase
        .from("legal_entity_details")
        .insert([legalDetails]);

      if (legalError) {
        console.error(
          "Ошибка вставки в legal_entity_details:",
          legalError.message
        );
        throw legalError;
      }
    }

    return userData;
  }

  // async registerUser(data) {
  //   const {
  //     full_name,
  //     email,
  //     phone,
  //     password,
  //     country,
  //     region,
  //     city,
  //     address,
  //     person_type,
  //     upload_file,
  //     fop,
  //     legal_entity,
  //   } = data;

  //   const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
  //     {
  //       email,
  //       password,
  //       options: { emailRedirectTo: undefined },
  //     }
  //   );

  //   if (signUpError) {
  //     throw signUpError;
  //   }

  //   const user = signUpData.user;
  //   if (!user) {
  //     throw new Error("User creation failed");
  //   }

  //   const userId = user.id;

  //   let avatarUrl = null;

  //   if (upload_file && upload_file.name) {
  //     const fileExt = upload_file.name.split(".").pop();
  //     const filePath = `${userId}.${fileExt}`;

  //     //TODO: add polici into database
  //     const { error: uploadErr } = await supabase.storage
  //       .from("avatars")
  //       .upload(filePath, upload_file, { upsert: true });

  //     if (uploadErr) {
  //       throw uploadErr;
  //     }

  //     const { data: urlData } = supabase.storage
  //       .from("avatars")
  //       .getPublicUrl(filePath);

  //     avatarUrl = urlData.publicUrl;
  //   }

  //   const { error: profileErr } = await supabase.rpc("create_full_user", {
  //     p_id: userId,
  //     p_full_name: full_name,
  //     p_phone: phone,
  //     p_country: country,
  //     p_region: region,
  //     p_city: city,
  //     p_address: address,
  //     p_person_type: person_type,
  //     p_avatar_url: avatarUrl,
  //     p_fop: fop ? JSON.stringify(fop) : null,
  //     p_legal: legal_entity ? JSON.stringify(legal_entity) : null,
  //   });

  //   if (profileErr) {
  //     throw profileErr;
  //   }

  //   return signUpData;
  // }
}

export const authApi = new Auth();
