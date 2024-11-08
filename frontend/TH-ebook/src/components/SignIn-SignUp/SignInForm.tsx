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
import {useForm, SubmitHandler} from "react-hook-form";
import {useState} from "react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {User} from "../../models/User.ts";

const ISignInSchema = yup.object().shape({
        nameoremail: yup.string().required(),
        password: yup.string().required(),
    }
)

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        // watch,
        formState: {errors}
    } = useForm({ resolver: yupResolver(ISignInSchema) });
    const onSubmit = (data: User) => {
        console.log(data);
    }
    return (
        <Card className="w-96">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader
                    variant="gradient"
                    color="deep-orange"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        {...register("nameoremail", {required: true, maxLength: 20})}
                        label="UserName"
                    />
                    {errors.nameoremail && <p className="text-red-900">This field is required</p>}

                    <div className="relative flex w-full">
                        <Input
                            label="Password"
                            {...register("password", {required: true, maxLength: 10})}
                            type={showPassword ? "text" : "password"}
                        />
                        <Checkbox
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            label="Show"
                        />
                    </div>
                    {errors.password && <p className="text-red-900">This field is required</p>}

                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        variant="gradient"
                        color="deep-orange"
                        fullWidth
                        type="submit" // Trigger the onSubmit function
                    >
                        Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don&apos;t have an account?
                        <Typography
                            as="a"
                            href="/auth/signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                            onClick={() => {
                                // navigate("/auth/signup");
                            }}
                        >
                            Sign Up
                        </Typography>
                    </Typography>
                </CardFooter>
            </form>
        </Card>
    );
}

export default SignInForm;