import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="float-left p-3 bg-white text-blue-500 border-2 border-blue-500 rounded-md hover:bg-blue-50 hover:shadow-lg transition-all duration-200 ease-in-out font-semibold text-lg mb-3">
            <FaArrowLeft />
        </button>
    );
}