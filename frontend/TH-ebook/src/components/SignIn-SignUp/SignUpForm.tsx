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
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ISignUpSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
});

const SignUpForm = () => {
    const { signup, user } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(ISignUpSchema) });

    const onSubmit = (data: { username: string, password: string, email: string }) => {
        signup(data.username, data.email, data.password);
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <Card className="w-96">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader
                    variant="gradient"
                    color="deep-orange"
                    className="mb-4 grid h-28 place-items-center">
                    <Typography variant="h3" color="white">
                        Sign Up
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        {...register("username", { required: true, maxLength: 20 })}
                        label="UserName" />
                    {errors.username && <p className="text-red-900">{errors.username.message}</p>}

                    <div className="relative flex w-full">
                        <Input
                            label="Password"
                            {...register("password", { required: true, maxLength: 10 })}
                            type={showPassword ? "text" : "password"} />
                        <Checkbox
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            label="Show" />
                    </div>
                    {errors.password && <p className="text-red-900">{errors.password.message}</p>}

                    <Input
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        label="Email" />
                    {errors.email && <p className="text-red-900">{errors.email.message}</p>}

                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me" />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        variant="gradient"
                        color="deep-orange"
                        fullWidth
                        type="submit">
                        Sign Up
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Already have an account?
                        <Typography
                            as="a"
                            href="/auth/signin"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                            onClick={() => {
                                navigate("/auth/signin");
                            }}>
                            Sign In
                        </Typography>
                    </Typography>
                </CardFooter>
            </form>
        </Card>
    );
};

export default SignUpForm;
