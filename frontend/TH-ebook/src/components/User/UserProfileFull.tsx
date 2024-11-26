import {Input} from "@material-tailwind/react";
import {User} from "../../models/User.ts";

interface UserProfilePageProps {
    user: User;
}


const UserProfileFull = ({user}: UserProfilePageProps) => {
        return (
            <div>
                <Input variant="outlined" placeholder="ID" value={user._id} onPointerEnterCapture={undefined}
                       onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                <Input variant="outlined" placeholder="Fist Name" value={user.firstName}
                       onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                <Input variant="outlined" placeholder="Last Name" value={user.lastName}
                       onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                <Input variant="outlined" placeholder="Username" value={user.username} onPointerEnterCapture={undefined}
                       onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                <Input variant="outlined" placeholder="Email" value={user.email} onPointerEnterCapture={undefined}
                       onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                <Input variant="outlined" placeholder="Phone" value={user.phone} onPointerEnterCapture={undefined}
                       onPointerLeaveCapture={undefined} crossOrigin={undefined} />

            </div>
        );
}

export default UserProfileFull;