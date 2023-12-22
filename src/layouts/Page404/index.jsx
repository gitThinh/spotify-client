const Page404 = () => {
    return (
        <div className="noone_coppy">
            <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    placeContent: 'center',
                    gap: '30px'
                }}
            >
                <h1>404 PAGE NOT FOUND</h1>
                <h3>Chúng tôi không thể tìm thấy đường dẫn này. Vui lòng kiểm tra lại!</h3>
                <a href="/" style={{
                    display: 'block',
                    fontSize: '18px',
                    backgroundColor: '#fff',
                    borderRadius:'30px',
                    padding:'.5em 1.5em',
                    color: '#000',
                    fontWeight:'600'
                }}>
                    Home
                </a>
            </div>
        </div>
    )
}

export default Page404