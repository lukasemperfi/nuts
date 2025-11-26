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
      full_name,
      email,
      phone,
      password,
      country,
      region,
      city,
      address,
      person_type,
      upload_file,
      fop,
      legal_entity,
    } = data;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: { emailRedirectTo: undefined },
      }
    );

    if (signUpError) {
      throw signUpError;
    }

    const user = signUpData.user;
    if (!user) {
      throw new Error("User creation failed");
    }

    const userId = user.id;

    let avatarUrl = null;

    if (upload_file && upload_file.name) {
      const fileExt = upload_file.name.split(".").pop();
      const filePath = `${userId}.${fileExt}`;

      const { error: uploadErr } = await supabase.storage
        .from("avatars")
        .upload(filePath, upload_file, { upsert: true });

      if (uploadErr) {
        throw uploadErr;
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      avatarUrl = urlData.publicUrl;
    }

    const { error: profileErr } = await supabase.rpc("create_full_user", {
      p_id: userId,
      p_full_name: full_name,
      p_phone: phone,
      p_country: country,
      p_region: region,
      p_city: city,
      p_address: address,
      p_person_type: person_type,
      p_avatar_url: avatarUrl,
      p_fop: fop ? JSON.stringify(fop) : null,
      p_legal: legal_entity ? JSON.stringify(legal_entity) : null,
    });

    if (profileErr) {
      throw profileErr;
    }

    return signUpData;
  }
}

export const authApi = new Auth();
