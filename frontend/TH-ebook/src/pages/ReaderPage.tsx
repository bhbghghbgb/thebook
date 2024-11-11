import { IconButton } from "@material-tailwind/react";
import { useEffect } from "react";
import {
  HiChevronLeft,
  HiChevronDoubleLeft,
  HiChevronRight,
  HiChevronDoubleRight,
  HiPlus,
  HiMinus,
  HiInformationCircle,
  HiBookmark,
} from "react-icons/hi";
import { TbSunMoon } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import LayoutComponent from "../components/Share/LayoutComponent.tsx";
import ReaderRenderer from "../components/Reader/ReaderRenderer";

function NavigationBar() {
  return (
    <LayoutComponent isMobile={false}>
      <div className="grid grid-cols-3 w-full h-16">
        <div className="flex flex-row gap-4 place-items-center justify-start">
          <IconButton
            color="deep-orange"
            size="lg"
            aria-label="mmb"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <TbSunMoon className="w-6 h-6"></TbSunMoon>
          </IconButton>
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiBookmark className="w-6 h-6"></HiBookmark>
          </IconButton>
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiInformationCircle className="w-6 h-6"></HiInformationCircle>
          </IconButton>
        </div>
        <div className="flex flex-row gap-4 place-items-center justify-center">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronDoubleLeft className="w-6 h-6"></HiChevronDoubleLeft>
          </IconButton>
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronLeft className="w-6 h-6"></HiChevronLeft>
          </IconButton>
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronRight className="w-6 h-6"></HiChevronRight>
          </IconButton>
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
          </IconButton>
        </div>
        <div className="flex flex-row gap-4 place-items-center justify-end">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiMinus className="w-6 h-6"></HiMinus>
          </IconButton>
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiPlus className="w-6 h-6"></HiPlus>
          </IconButton>
        </div>
      </div>
    </LayoutComponent>
  );
}

export default function ReaderPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string; pg: string }>();
  useEffect(() => {
    if (!params.pg) {
      navigate(`/reader/${params.id}/${1}`, {
        replace: true,
      });
    }
  }, [navigate, params.pg, params.id]);

  return (
    <>
      <NavigationBar />
      <h1>me may beo</h1>
      <h1>(bi anh huong style do o nhiem css tu file doc vao, can fix)</h1>
      <ReaderRenderer />
      <NavigationBar />
    </>
  );
}
