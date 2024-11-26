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
import {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useDispatch} from "react-redux";
import {authFailure, authSusccess} from "../../features/user/userSlice.ts";

const ISignUpSchema = yup.object().shape({
    username: yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must not exceed 20 characters'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(10, 'Password must not exceed 10 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    fistName: yup.string()
        .required('First Name is required')
        .min(3, 'First Name must be at least 3 characters')
        .max(20, 'First Name must not exceed 20 characters'),
    lastname: yup.string()
        .required('Last Name is required')
        .min(3, 'Last Name must be at least 3 characters')
        .max(20, 'Last Name must not exceed 20 characters'),
    phone: yup.number()
        .required('Phone is required')
        // .min(10, 'Phone must be at least 10 characters')
        // .max(10, 'Phone must not exceed 10 characters'),

});

const SignUpForm = () => {
    const {signup, user} = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(ISignUpSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: { username: string, password: string, email: string, fistName: string, lastname: string , phone: string }) => {
        try {
            setIsLoading(true);
            setMessage("");

            await signup(data.username, data.email, data.password, data.fistName, data.lastname, data.phone);

            // If signup is successful, the user will be automatically signed in
            // and the AuthContext will update the user state
            dispatch(authSusccess(user!));

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign up';
            setMessage(errorMessage);
            dispatch(authFailure(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

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
                        Sign Up
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}>
                    <Input
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        crossOrigin={undefined} {...register("username", {required: true, maxLength: 20})}
                        label="Username"
                        error={!!errors.username}
                        disabled={isLoading}/>
                    {errors.username && (
                        <p className="text-red-900 text-sm">
                            {errors.username.message as string}
                        </p>
                    )}
                    <Input
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        crossOrigin={undefined} {...register("fistName", {required: true, maxLength: 20})}
                        label="First Name"
                        error={!!errors.fistName}
                        disabled={isLoading}/>
                    {errors.fistName && (
                        <p className="text-red-900 text-sm">
                            {errors.fistName.message as string}
                        </p>
                    )}
                    <Input
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        crossOrigin={undefined} {...register("lastname", {required: true, maxLength: 20})}
                        label="Last Name"
                        error={!!errors.lastname}
                        disabled={isLoading}/>
                    {errors.lastname && (
                        <p className="text-red-900 text-sm">
                            {errors.lastname.message as string}
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
                            disabled={isLoading}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            crossOrigin={undefined}/>
                    </div>
                    {errors.password && (
                        <p className="text-red-900 text-sm">
                            {errors.password.message as string}
                        </p>
                    )}

                    <Input
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined} {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                        label="Email"
                        error={!!errors.email}
                        disabled={isLoading}/>
                    {errors.email && (
                        <p className="text-red-900 text-sm">
                            {errors.email.message as string}
                        </p>
                    )}
                    <Input
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined} {...register("phone", {required: true, pattern: /^\d{10}$/})}
                        label="Phone"
                        error={!!errors.phone}
                        disabled={isLoading}/>
                    {errors.phone && (
                        <p className="text-red-900 text-sm">
                            {errors.phone.message as string}
                        </p>
                    )}

                    {message && (
                        <p className="text-red-900 text-sm text-center">
                            {message}
                        </p>
                    )}
                </CardBody>
                <CardFooter className="pt-0"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                    <Button
                        variant="gradient"
                        color="deep-orange"
                        fullWidth
                        type="submit"
                        disabled={isLoading}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}                    >
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                        Already have an account?
                        <Typography
                            as="a"
                            href="/auth/signin"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/auth/signin");
                            }}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                            Sign In
                        </Typography>
                    </Typography>
                </CardFooter>
            </form>
        </Card>
    );
};

export default SignUpForm;
