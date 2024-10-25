import {Card} from "@material-tailwind/react";

const sampleData = {
    cover: "/api/placeholder/280/400",
    title: "Beast Tamer",
    status: "Ongoing",
    authors: ["Suzu Miyama", "Shigemura Moto"],
    chapters: [
        {
            number: "3",
            group: "Nhom 7",
            uploader: "SapDuocRoi",
            timestamp: "N/A"
        },
        {
            number: "2",
            group: "Nhom ten dai",
            uploader: "Uploader ten dai",
            timestamp: "N/A"
        },
        {
            number: "1",
            group: "SGU",
            uploader: "Web 1",
            timestamp: "N/A"
        }
    ]
};


const BookDetailTestComponent = () => {
    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* Grid Container with custom areas */}
            <div className="grid grid-areas-product-detail">
                {/* Left Sidebar */}
                <div className="grid-in-header bg-gray-100 p-4">Left Sidebar</div>

                {/* Cover Section */}
                <div className="grid-in-cover flex justify-center">
                    <Card className="w-full max-w-sm overflow-hidden">
                        <img
                            src={sampleData.cover}
                            alt="Manga Cover"
                            className="w-full h-auto object-cover"
                        />
                        <div className="p-2 bg-green-100 text-green-800 text-center">
                            {sampleData.status}
                        </div>
                    </Card>
                </div>

                {/* Facing Section */}
                <div className="grid-in-facing bg-gray-100 p-4">Facing Page</div>

                {/* Right Sidebar */}
                <div className="grid-in-right bg-gray-100 p-4">Right Sidebar</div>

                {/* Buttons Section */}
                <div className="grid-in-buttons bg-gray-100 p-4">Buttons</div>

                {/* Tags Section */}
                <div className="grid-in-tags bg-gray-100 p-4">
                    <div className="flex flex-wrap gap-2">
                        {['Fantasy', 'Romance', 'Comedy', 'Adventure', 'Harem'].map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                {tag}
              </span>
                        ))}
                    </div>
                </div>

                {/* Scores Section */}
                <div className="grid-in-scores bg-gray-100 p-4">Scores</div>

                {/* Description Section */}
                <div className="grid-in-desc col-span-full">
                    <Card className="p-4">
                        <h2 className="font-bold mb-2">Description</h2>
                        <p className="text-gray-600">
                            Beast Tamer Rein, who uses animals, has fought as a party of heroes.
                            However, Rein, who has no other merits, gradually becomes unable to keep
                            up with the battle...
                        </p>
                    </Card>
                </div>

                {/* Info Section */}
                <div className="grid-in-info bg-gray-100 p-4">Info</div>

                {/* Chapter List Section */}
                <div className="grid-in-chapter col-span-full">
                    <Card className="overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="font-bold">Chapter List</h2>
                        </div>
                        <div className="divide-y">
                            {sampleData.chapters.map((chapter) => (
                                <div key={chapter.number}
                                     className="grid grid-cols-4 md:grid-cols-12 p-4 hover:bg-gray-50 transition-colors">
                                    <div className="col-span-4 md:col-span-3 font-medium">
                                        Chapter {chapter.number}
                                    </div>
                                    <div className="col-span-4 md:col-span-3 text-gray-600">
                                        {chapter.group}
                                    </div>
                                    <div className="col-span-2 md:col-span-3 text-gray-500">
                                        {chapter.timestamp}
                                    </div>
                                    <div className="col-span-2 md:col-span-3 text-gray-600">
                                        {chapter.uploader}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BookDetailTestComponent;