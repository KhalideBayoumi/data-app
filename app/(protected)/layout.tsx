import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10">
            <Navbar />
            <div className="flex-grow pt-16">
                { children }
            </div>
        </div>
    );
}
 
export default ProtectedLayout;