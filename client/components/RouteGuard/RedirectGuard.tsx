import { useRouter } from "next/router";
import { useEffect } from "react";

export function RedirectGuard() {
    const router = useRouter();

    useEffect(() => {
        router.push("/");

    }, [router]);

    return null;
}