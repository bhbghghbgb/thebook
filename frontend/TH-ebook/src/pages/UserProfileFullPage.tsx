import UserProfileFull from "../components/User/UserProfileFull.tsx";
import {User} from "../models/User.ts";
import withAuth from "../components/hoc/withAuth.tsx";

interface Props {
    user: User;
}

const UserProfileFullPage = ({user}: Props) => {

    return (
        <UserProfileFull user={user} />
    )
}

// const UserProfileFullPageEnhance= () => {
//     const WrappedComponent = withAuth<Props>(UserProfileFullPage);
//     return <WrappedComponent />;
// }

const UserProfileFullPageEnhance = withAuth<Props>(UserProfileFullPage);

export default UserProfileFullPageEnhance;