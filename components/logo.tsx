import Image from 'next/image';

const Logo = () => {
    return (
        <div className="logo-container">
            <div className="logo-spin">
                <Image
                    src="/logo_dataguru.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="logo-image"
                />
            </div>
            <style jsx>{`
                .logo-container {
                    width: 32px;
                    height: 32px;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .logo-spin {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: spin 5s linear infinite;
                }

                .logo-image {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Logo;