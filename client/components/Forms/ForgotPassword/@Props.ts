export interface ForgetPasswordFormProps {
    loading: boolean,
    setLoading: (loading: boolean) => void;
    setError: (msg: string) => void;
    onSuccess: () => void;
}