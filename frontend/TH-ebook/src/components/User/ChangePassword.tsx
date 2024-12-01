import CardDefault from "../Card/CardDefault.tsx";
import {Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography} from "@material-tailwind/react";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext.tsx";
import {ApiResponse} from "../../type/ApiResponse.ts";
import {User} from "../../models/User.ts";

const IChangePasswordSchema = yup.object().shape({
    oldPassword: yup.string().required('Old Password is required'),
    newPassword: yup.string()
        .required('New Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .notOneOf([yup.ref('oldPassword')], 'New Password must not be the same as Old Password'),
    confirmPassword: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
});

interface ChangePasswordFormInputs {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}


const ChangePassword = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(IChangePasswordSchema),
        mode: 'onChange'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const {changePassword} = useAuth();


    const onSubmit: SubmitHandler<ChangePasswordFormInputs> =async (data) => {
        setIsLoading(true);
        setMessage("");

        try {
            const response = await changePassword(data.oldPassword, data.newPassword);
            if (response.data === null) {
                setMessage(response.message ?? "");
            }
        }catch (error: unknown) {
            const errorMessage = (error as ApiResponse<User>).detail?.message ?? 'Change Password failed';
            setMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
        console.log("Change Password");
        console.log(data);
    }
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
                        Change Password
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}>
                    <Input
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        crossOrigin={undefined} {...register("oldPassword", {required: true, maxLength: 20})}
                        label="Old Password"
                        error={!!errors.oldPassword}
                        type={showPassword ? "text" : "password"}
                        disabled={isLoading}/>
                    {errors.oldPassword && (
                        <p className="text-red-900 text-sm">
                            {errors.oldPassword.message as string}
                        </p>
                    )}

                    <div className="relative flex w-full">
                        <Input
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}
                            label="New Password"
                            {...register("newPassword", {required: true, maxLength: 10})}
                            type={showPassword ? "text" : "password"}
                            error={!!errors.newPassword}
                            disabled={isLoading}/>
                        <Checkbox
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            label="Show"
                            disabled={isLoading} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                            crossOrigin={undefined}/>
                    </div>
                    {errors.newPassword && (
                        <p className="text-red-900 text-sm">
                            {errors.newPassword.message as string}
                        </p>
                    )}
                    <Input
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}
                        label="Confirm Password"
                        {...register("confirmPassword", {required: true, maxLength: 10})}
                        type="password"
                        error={!!errors.confirmPassword}
                        disabled={isLoading}/>
                    {errors.confirmPassword && (
                        <p className="text-red-900 text-sm">
                            {errors.confirmPassword.message as string}
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
                        {isLoading ? "Changing Password..." : "Change Password"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default ChangePassword;