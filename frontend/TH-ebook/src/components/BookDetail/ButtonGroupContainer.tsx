import {Button, IconButton} from "@material-tailwind/react";
import {HiArrowUp, HiBookOpen, HiFlag} from "react-icons/hi";

interface Props {
    onAddToLibrary: () => void;
    onPreview: () => void;
    onPreoder: () => void;
    onSub: () => void;
}

const ButtonGroupContainer = ({onAddToLibrary, onSub, onPreview, onPreoder}:Props) => {
    return (
        <>
            <div className="button flex gap-2">
                <div className="flex gap-2">
                    <Button variant="filled" onClick={onAddToLibrary} size="lg" color="deep-orange">Add To
                        Library</Button>
                    <IconButton color="lightBlue" size="lg">
                        <HiBookOpen/>
                    </IconButton>
                    <IconButton color="lightBlue" size="lg">
                        <HiFlag/>
                    </IconButton>
                    <IconButton color={"lightBlue"} size="lg">
                        <HiArrowUp/>
                    </IconButton>
                </div>
                <div className="flex gap-2">
                    <Button variant="filled" onClick={onPreview} size="lg"
                            color="deep-orange">Preview</Button>
                    <Button variant="filled" onClick={onPreoder} size="lg"
                            color="deep-orange">Preorder</Button>
                    <Button variant="filled" onClick={onSub} size="lg" color="deep-orange">Sub</Button>
                </div>
            </div>
        </>
    )
}

export default ButtonGroupContainer;
