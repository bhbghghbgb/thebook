import {useForm, SubmitHandler} from "react-hook-form";
import {Button, Input, Typography} from "@material-tailwind/react";
import {User} from "../../models/User.ts";
import {api} from "../../utils/axiosInterceptors.ts";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../type/ApiResponse.ts";
import {useState} from "react";

interface UserProfileFormInputs {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
}

interface UserProfilePageProps {
    user: User;
}

const UserProfileFull = ({user: initialUser}: UserProfilePageProps) => {
    // Tạo state để quản lý user
    const [user, setUser] = useState<User>(initialUser);
    const API_URL: string = import.meta.env.VITE_API_URL2;
    const endpoint = "edit-profile";

    const {register, handleSubmit} = useForm<UserProfileFormInputs>({
        defaultValues: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phone: user.phone,
        },
    });
    // Todo: gọi api trên 1 tầng cao hơn
    const onSubmit: SubmitHandler<UserProfileFormInputs> = async (data) => {
        const hasChanges = (
            data.firstName !== user.firstName ||
            data.lastName !== user.lastName ||
            data.username !== user.username ||
            data.email !== user.email ||
            data.phone !== user.phone
        );
        console.info("Has changes: ", hasChanges);
        if (!hasChanges) {
            alert("No changes detected");
            return;
        }
        const { _id, ...dataWithoutId } = data;
        console.log("User id update profile ", _id);
        const response: AxiosResponse<ApiResponse<User>> = await api.put(`${API_URL}/${endpoint}`, dataWithoutId);
        if (!response.data.isError) {
            // Cập nhật state với dữ liệu mới từ server
            setUser(response.data.data ?? initialUser);
            alert("Profile updated successfully");
        } else {
            alert("Profile update failed");
        }

        console.log(response.data.message);
        console.log("New user profile: ",response.data.data);


    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                <img
                    className="h-80 w-full rounded-lg object-cover object-center"
                    src="https://www.notion.so/images/page-cover/met_william_morris_1877_willow.jpg"
                    alt="cover"
                />

                <div className="flex flex-row gap-10">
                    <img
                        className="h-20 w-20 rounded-full object-cover object-center"
                        src={user.avatar}
                        alt="avatar"
                    />
                    <div className="flex flex-col gap-y-2">
                        <Typography color="white" variant="h6">
                            {user.firstName + " " + user.lastName}
                        </Typography>

                        <div className="flex flex-row gap-x-2">
                            <Button variant="gradient" color="deep-orange" size="sm">
                                Change Avatar
                            </Button>
                            <Button variant="gradient" color="deep-orange" size="sm">
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>

                <Input
                    variant="outlined"
                    placeholder="ID"
                    {...register("_id")}
                    /*

                    The ... syntax in JavaScript and TypeScript is known as the spread operator.
                    In the context of your code, ...register("_id"), it is used to spread the
                    properties returned by the register function into the component's props.


                    */
                    color="white"
                    readOnly
                />

                <Input
                    variant="outlined"
                    placeholder="First Name"
                    {...register("firstName")}
                    color="white"
                />
                <Input
                    variant="outlined"
                    placeholder="Last Name"
                    {...register("lastName")}
                    color="white"
                />
                <Input
                    variant="outlined"
                    placeholder="Username"
                    {...register("username")}
                    color="white"
                />
                <Input
                    variant="outlined"
                    placeholder="Email"
                    {...register("email")}
                    color="white"
                />
                <Input
                    variant="outlined"
                    placeholder="Phone"
                    {...register("phone")}
                    color="white"
                />
                <Button type="submit" className="text-white px-4 py-2 rounded" variant="gradient" color="deep-orange">
                    Save
                </Button>
            </div>
        </form>
    );
};

export default UserProfileFull;
