import axios from "axios";

// Interface
interface SignInData {
  email: string;
  name: string;
  password: string;
  password2: string;
}

interface SignInAuth {
  hasError: boolean;
  message?: string;
}

const signInAuth = async ({
  email,
  name,
  password,
  password2,
}: SignInData): Promise<SignInAuth> => {
  try {
    //const { data } = await tesloApi.post('/user/register', { name, email, password });
    // const { token, user } = data;
    return {
      hasError: false,
    };
  } catch (error) {
    return {
      hasError: true,
      message: axios.isAxiosError(error)
        ? String(error.response?.data)
        : "SignIn process failed. Try again or contact with support!",
    };
  }
};

export { signInAuth };
