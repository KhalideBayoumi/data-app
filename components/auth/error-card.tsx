import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export const ErrorCard = () => {
    return (
        /*<Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Une erreur est survenue!" />
            </CardHeader>
            <CardFooter>
                <BackButton 
                    label="Retourner à la page de login"
                    href="/auth/login"
                />
            </CardFooter>
        </Card>*/
        <CardWrapper
            headerLabel="An error has occurred"
            backButtonLabel="Return to login page"
            backButtonHref="/auth/login"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    );
};