import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import PartComponent from "./PartComponent.tsx";

export function TabsDefault() {
    const data = [
        {
            label: "Chapter",
            value: "chapter",
            content: (
                <div>
                    <PartComponent/>
                </div>
            )
        },
        {
            label: "Comment",
            value: "comment",
            content: `Chúng tôi hiện đang tiếp tục xây dựng tính năng này. Các bạn có thể ủng hộ chúng tôi phát triển tính năng bằng cách đăng ký gói.`,
        },
    ];

    return (
        <Tabs value="html">
            <TabsHeader>
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, content }) => (
                    <TabPanel key={value} value={value}>
                        {content}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}

export default TabsDefault;

