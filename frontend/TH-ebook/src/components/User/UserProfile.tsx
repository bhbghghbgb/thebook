import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import {User} from "../../models/User.ts";

interface UserProfileProps {
    user: User;
    onLogout: () => void;
}

function UserProfile({user, onLogout}: UserProfileProps) {
    return (
        <section className="container mx-auto px-8 py-10">
            <Card
                shadow={false}
                className="border border-gray-300 rounded-2xl"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}            >
                <CardHeader shadow={false} className="h-60 !rounded-lg"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                    <img
                        src= "https://www.notion.so/images/page-cover/met_william_morris_1877_willow.jpg"
                        alt="dark"
                        height={1024}
                        width={1024}
                        className="w-full h-full object-center"
                    />
                </CardHeader>
                <CardBody
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}>
                    <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Avatar src={user.avatar} alt="avatar" variant="rounded"
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}/>
                            <div>
                                <Typography color="blue-gray" variant="h6"
                                            placeholder={undefined}
                                            onPointerEnterCapture={undefined}
                                            onPointerLeaveCapture={undefined}>
                                    {user.username}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-gray-600"
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}>
                                    {user.email}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="outlined"
                                className="border-gray-300 flex items-center gap-2"
                                placeholder={undefined} onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                                <i className="fa fa-github text-base"/>
                                Github
                            </Button>
                            <Button
                                variant="outlined"
                                className="border-gray-300 flex items-center gap-2"
                                placeholder={undefined} onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                                <i className="fa-brands fa-twitter"/>
                                Twitter
                            </Button>
                            <Button
                                variant="outlined"
                                className="border-gray-300 flex items-center gap-2"
                                placeholder={undefined} onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                                <i className="fa-brands fa-medium"/>
                                Medium
                            </Button>
                        </div>
                        <div className="flex mt-2 gap-3">
                            <Button variant="gradient" color="deep-orange"
                                    placeholder={undefined} onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}>
                                Edit Profile
                            </Button>
                            <Button variant="gradient" color="deep-orange"
                                    placeholder={undefined} onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                    onClick={() => {
                                        onLogout();
                                    }}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>

                </CardBody>
            </Card>
        </section>
    );
}

export default UserProfile;