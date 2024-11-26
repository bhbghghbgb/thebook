import {Input, Typography} from "@material-tailwind/react";
import {User} from "../../models/User.ts";

interface UserProfilePageProps {
    user: User;
}


const UserProfileFull = ({user}: UserProfilePageProps) => {
    return (
        <div className="flex flex-col gap-5">
            <img
                className="h-80 w-full rounded-lg object-cover object-center"
                src="https://www.notion.so/images/page-cover/met_william_morris_1877_willow.jpg"
                alt="cover"
            />

            <div className="flex flex-row gap-10 ">

                <img
                    className="h-20 w-20 rounded-full object-cover object-center"
                    src={user.avatar}
                    alt="avatar"
                />

                <div>
                    <Typography color="white" variant="h6"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                        {user.firstName + " " + user.lastName}
                    </Typography>
                </div>
            </div>

            <Input variant="outlined"
                   placeholder="ID"
                   value={user._id}
                   color="white"
                   onPointerEnterCapture={undefined}
                   onPointerLeaveCapture={undefined}
                   crossOrigin={undefined}/>
            <Input variant="outlined" placeholder="Fist Name" value={user.firstName} color="white"
                   onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}/>
            <Input variant="outlined" placeholder="Last Name" value={user.lastName} color="white"
                   onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}/>
            <Input variant="outlined" placeholder="Username" value={user.username} color="white"
                   onPointerEnterCapture={undefined}
                   onPointerLeaveCapture={undefined} crossOrigin={undefined}/>
            <Input variant="outlined" placeholder="Email" value={user.email} color="white"
                   onPointerEnterCapture={undefined}
                   onPointerLeaveCapture={undefined} crossOrigin={undefined}/>
            <Input variant="outlined" placeholder="Phone" value={user.phone} color="white"
                   onPointerEnterCapture={undefined}
                   onPointerLeaveCapture={undefined} crossOrigin={undefined}/>

        </div>
    );
}

export default UserProfileFull;