import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24">
                { children }
            </div>
            <Footer />
        </div>
    );
}
 
export default ProtectedLayout;