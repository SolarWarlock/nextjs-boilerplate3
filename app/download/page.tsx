import Image from 'next/image';
import Link from 'next/link';

const ArrowLeft = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
            <div className="container mx-auto max-w-lg text-center">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Вернуться на главную
                    </Link>
                </div>

                <div className="bg-amber-100 border border-amber-200 rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-amber-900 mb-4">
                        Скачать мобильное приложение
                    </h1>
                    <p className="text-amber-800 mb-6 text-lg">
                        Отсканируйте QR-код с помощью камеры вашего телефона, чтобы загрузить установочный файл (.apk) для Android.
                    </p>

                    <div className="flex justify-center mb-6">
                        <Image
                            src="/images/QRcode_download_apk.png"
                            alt="QR-код для скачивания APK"
                            width={400}
                            height={400}
                            className="rounded-lg border-4 border-amber-300"
                            priority
                        />
                    </div>

                    <div className="text-sm text-amber-700 bg-amber-200 p-3 rounded-md">
                        <p><strong>Внимание:</strong> Вам может потребоваться разрешить установку приложений из неизвестных источников в настройках вашего устройства.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}