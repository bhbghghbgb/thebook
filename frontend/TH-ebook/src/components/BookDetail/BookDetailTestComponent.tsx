const BookDetailTestComponent = () => {
    return (
        <div
            className="grid min-h-dvh gap-x-[--rgrid-g] grid-cols-[1fr] grid-rows-[auto] grid-areas-product-detail">
            <div className="grid-in-header">header</div>
            <div className="grid-in-nav">nav</div>
            <div className="grid-in-main">main</div>
            <div className="grid-in-footer">footer</div>
        </div>
    );
}

export default BookDetailTestComponent;