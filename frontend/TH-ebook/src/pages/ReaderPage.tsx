import { IconButton, Tooltip } from "@material-tailwind/react";
import {
  HiBookmark,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiInformationCircle,
  HiMinus,
  HiPlus,
} from "react-icons/hi";
import { TbSunMoon } from "react-icons/tb";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import ReaderRenderer, {
  ReaderProps,
} from "../components/Reader/ReaderRenderer";
import { useEffect, useState } from "react";
type StringNumberObject = { [key: string]: number };
// Interface/StringNumberObject Type: Defines a type where keys are strings and values are numbers.
// Example Object: Demonstrates creating an object that adheres to this type.
// Function to Parse Values: parseAllFields function converts all string values to numbers.
function parseAllFields(obj: { [key: string]: string }): StringNumberObject {
  const parsedObj: StringNumberObject = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      parsedObj[key] = parseInt(obj[key], 10);
    }
  }
  return parsedObj;
}
function lastVolume(navigate: NavigateFunction, id: number, vl: number) {
  return _navigate(navigate, id, vl > 1 ? vl - 1 : 1, 1);
}
function nextVolume(navigate: NavigateFunction, id: number, vl: number) {
  return _navigate(navigate, id, vl + 1, 1);
}
function lastPage(
  navigate: NavigateFunction,
  id: number,
  vl: number,
  pg: number
) {
  return _navigate(navigate, id, vl, pg > 1 ? pg - 1 : 1);
}
function nextPage(
  navigate: NavigateFunction,
  id: number,
  vl: number,
  pg: number
) {
  return _navigate(navigate, id, vl, pg + 1);
}
function _navigate(
  navigate: NavigateFunction,
  id: number,
  vl: number,
  pg: number
) {
  navigate(`/book/${id}/${vl}/${pg}`);
  return { id, vl, pg };
}
function NavigationBar({
  bookId,
  volumeNth,
  pagePage,
  lastVolume,
  lastPage,
  nextVolume,
  nextPage,
}: ReaderProps & {
  lastVolume: () => void;
  lastPage: () => void;
  nextPage: () => void;
  nextVolume: () => void;
}) {
  if (!bookId || !volumeNth || !pagePage) {
    return <>Url malfunction.</>;
  }
  return (
    <div className="grid grid-cols-3 w-full h-16">
      <div className="flex flex-row gap-4 place-items-center justify-start">
        <Tooltip content="Dark mode">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <TbSunMoon className="w-6 h-6"></TbSunMoon>
          </IconButton>
        </Tooltip>
        <Tooltip content="Bookmark">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiBookmark className="w-6 h-6"></HiBookmark>
          </IconButton>
        </Tooltip>
        <Tooltip content="Why are you here">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiInformationCircle className="w-6 h-6"></HiInformationCircle>
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-row gap-4 place-items-center justify-center">
        <Tooltip content="Last volume">
          <IconButton
            color="deep-orange"
            size="lg"
            onClick={() => lastVolume()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronDoubleLeft className="w-6 h-6"></HiChevronDoubleLeft>
          </IconButton>
        </Tooltip>
        <Tooltip content="Last page">
          <IconButton
            color="deep-orange"
            size="lg"
            onClick={() => lastPage()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronLeft className="w-6 h-6"></HiChevronLeft>
          </IconButton>
        </Tooltip>
        <Tooltip content="Next page">
          <IconButton
            color="deep-orange"
            size="lg"
            onClick={() => nextPage()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronRight className="w-6 h-6"></HiChevronRight>
          </IconButton>
        </Tooltip>
        <Tooltip content="Next volume">
          <IconButton
            color="deep-orange"
            size="lg"
            onClick={() => nextVolume()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-row gap-4 place-items-center justify-end">
        <Tooltip content="Decrease font size">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiMinus className="w-6 h-6"></HiMinus>
          </IconButton>
        </Tooltip>
        <Tooltip content="Increase font size">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiPlus className="w-6 h-6"></HiPlus>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default function ReaderPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string; vl: string; pg: string }>();
  const [{ id, vl, pg }, setParams] = useState(parseAllFields(params));
  useEffect(() => {
    setParams(parseAllFields(params));
  }, [params]);
  if (!id || !vl || !pg) {
    return <>Url malfunction.</>;
  }
  return (
    <>
      <NavigationBar
        bookId={id}
        volumeNth={vl}
        pagePage={pg}
        lastVolume={() => {
          setParams(lastVolume(navigate, id, vl));
        }}
        lastPage={() => {
          lastPage(navigate, id, vl, pg);
        }}
        nextPage={() => {
          nextPage(navigate, id, vl, pg);
        }}
        nextVolume={() => {
          nextVolume(navigate, id, vl);
        }}
      />
      <ReaderRenderer bookId={id} volumeNth={vl} pagePage={pg} />
      <NavigationBar
        bookId={id}
        volumeNth={vl}
        pagePage={pg}
        lastVolume={() => {
          lastVolume(navigate, id, vl);
        }}
        lastPage={() => {
          lastPage(navigate, id, vl, pg);
        }}
        nextPage={() => {
          nextPage(navigate, id, vl, pg);
        }}
        nextVolume={() => {
          nextVolume(navigate, id, vl);
        }}
      />
      <h1>me may beo</h1>
      <h1>(bi anh huong style do o nhiem css tu file doc vao, can fix)</h1>
      <h1>^ (da fix) ko con bi anh huong do da xai dompurify de loc sach</h1>
    </>
  );
}
