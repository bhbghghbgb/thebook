import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useDispatch} from "react-redux";
import {authFailure, authSusccess} from "../../features/user/userSlice.ts";
import {AuthResponse} from "../../type/AuthResponse.ts";

const ISignInSchema = yup.object().shape({
    usernameoremail: yup.string().required('Username or email is required'),
    password: yup.string().required('Password is required'),
});

const SignInForm = () => {
    const {signin} = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(ISignInSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: { usernameoremail: string, password: string }) => {
        try {
            setIsLoading(true);
            setMessage("");

            const response: AuthResponse = await signin(data.usernameoremail, data.password);

            if (!response.success) {
                setMessage(response.message);
                dispatch(authFailure(response.message));
                return;
            }

            if (response.user) {
                dispatch(authSusccess(response.user));
                navigate('/');
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign in';
            setMessage(errorMessage);
            dispatch(authFailure(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     if (user) {
    //         navigate('/');
    //     }
    // }, [user, navigate]);

    return (
        <Card className="w-96"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader
                    variant="gradient"
                    color="deep-orange"
                    className="mb-4 grid h-28 place-items-center"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}>
                    <Typography variant="h3" color="white"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}>
                    <Input
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        crossOrigin={undefined} {...register("usernameoremail", {required: true, maxLength: 20})}
                        label="Username or Email"
                        error={!!errors.usernameoremail}
                        disabled={isLoading}/>
                    {errors.usernameoremail && (
                        <p className="text-red-900 text-sm">
                            {errors.usernameoremail.message as string}
                        </p>
                    )}

                    <div className="relative flex w-full">
                        <Input
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}
                            label="Password"
                            {...register("password", {required: true, maxLength: 10})}
                            type={showPassword ? "text" : "password"}
                            error={!!errors.password}
                            disabled={isLoading}/>
                        <Checkbox
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            label="Show"
                            disabled={isLoading} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                            crossOrigin={undefined}/>
                    </div>
                    {errors.password && (
                        <p className="text-red-900 text-sm">
                            {errors.password.message as string}
                        </p>
                    )}

                    {message && (
                        <p className="text-red-900 text-sm text-center">
                            {message}
                        </p>
                    )}
                </CardBody>
                <CardFooter className="pt-0" placeholder={undefined}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Button
                        variant="gradient"
                        color="deep-orange"
                        fullWidth
                        type="submit"
                        disabled={isLoading} placeholder={undefined}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center"
                                placeholder={undefined} onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                        Don&apos;t have an account?
                        <Typography
                            as="a"
                            href="/auth/signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/auth/signup");
                            }}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                            Sign Up
                        </Typography>
                    </Typography>
                </CardFooter>
            </form>
        </Card>
    );
}

export default SignInForm;
