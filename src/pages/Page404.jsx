const Page404 = () => {
    return (
        <div className="container404">
            <div className="headerPage" style={{ position: 'absolute' }}>
                <i className="fa-brands fa-spotify"></i>
                <h2>Spotify Clone</h2>
            </div>
            <div className="content404"
                style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    placeContent: 'center',
                    gap: '30px'
                }}
            >
                <h1>404 PAGE NOT FOUND</h1>
                <h3>Chúng tôi không thể tìm thấy đường dẫn này vui lòng kiểm tra lại</h3>
                <a href="/" className="tranferPages">Home</a>
            </div>
        </div>
    );
};

export default Page404;