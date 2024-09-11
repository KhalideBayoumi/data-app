import Image from 'next/image';

const Logo = () => {
    return (
        <div className="logoSpin">
            <Image
                src="/logo_dataguru.png"
                alt="Logo"
                width={260}
                height={260}
            />
            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .logoSpin {
                    animation: spin 5s linear infinite;
                    display: inline-block;
                }
            `}</style>
        </div>
    );
};

export default Logo;