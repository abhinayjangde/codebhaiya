import Image from 'next/image'

const Gears: React.FC = () => {
    return (
        <section className="text-gray-600 dark:text-white h-full dark:bg-dark body-font">
            <div className="container px-5 py-10 md:py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <div className="flex gap-4 items-center justify-center sm:text-3xl text-2xl font-medium title-font mb-0 dark:text-slate-100 text-gray-900">
                        <span>MY GEARS</span>
                    </div>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-lg">
                        This is what I use to create my content. I am not sponsored by any of these companies.
                    </p>
                </div>

                <div className="mb-4 ">
                    <div className="mt-10">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-10 text-gray-900 dark:text-white ">
                            Main Gears
                        </h1>
                    </div>
                    <div className="-mx-4 -mb-10 -mt-4 flex flex-wrap sm:-m-4">

                        <div className="h-90 mb-6 flex flex-col justify-between p-4 sm:mb-0 md:w-1/3">
                            <div className="h-64 overflow-hidden rounded-lg">
                                <Image
                                    alt="content"
                                    className="h-full w-full object-cover object-center"
                                    src="https://codebhaiya.s3.ap-south-1.amazonaws.com/mygears/lenovo.jpg"
                                    width={1260}
                                    height={930}
                                />
                            </div>
                            <h2 className="title-font mt-5 text-xl font-medium text-gray-900 dark:text-gray-100">
                                Lenovo Ideapad 330
                            </h2>
                            <p className="mt-2 text-base leading-relaxed dark:text-gray-400">
                                {" "}
                                I bought it back in 2020 when I was in class 12th. It has 8GB RAM, 2TB HDD, and 2GB AMD Graphics. It is a good laptop for programming and video editing. I use it for my YouTube tutorial videos as well.
                            </p>
                            <a
                                href="https://amzn.in/d/3Hryxxx"
                                target="_blank"
                                rel="noreferrer"
                                className="my-1 mr-2 inline-flex w-fit cursor-pointer items-center rounded-full bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-lg transition ease-in-out hover:scale-105 hover:bg-blue-800"

                            >
                                {" "}
                                View on Amazon{" "}
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="ml-2 h-4 w-4"
                                    viewBox="0 0 24 24"
                                >
                                    {" "}
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>

                        <div className="h-90 mb-6 flex flex-col justify-between p-4 sm:mb-0 md:w-1/3">
                            <div className="h-64 overflow-hidden rounded-lg">
                                <Image
                                    alt="content"
                                    className="h-full w-full object-cover object-center"
                                    src="https://codebhaiya.s3.ap-south-1.amazonaws.com/mygears/m31.webp"
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <h2 className="title-font mt-5 text-xl font-medium text-gray-900 dark:text-gray-100">
                                Samsung Galaxy M31
                            </h2>
                            <p className="mt-2 text-base leading-relaxed dark:text-gray-400">
                                {" "}
                                I bought it back in 2021. It has 6GB RAM, 128GB Internal Storage. It is a good phone and camera is also amazing. I use it for my YouTube video recording.
                            </p>
                            <a
                                href="https://amzn.in/d/3Hryxxx"
                                target="_blank"
                                rel="noreferrer"
                                className="my-1 mr-2 inline-flex w-fit cursor-pointer items-center rounded-full bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-lg transition ease-in-out hover:scale-105 hover:bg-blue-800"

                            >
                                {" "}
                                View on Amazon{" "}
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="ml-2 h-4 w-4"
                                    viewBox="0 0 24 24"
                                >
                                    {" "}
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>

                        <div className="h-90 mb-6 flex flex-col justify-between p-4 sm:mb-0 md:w-1/3">
                            <div className="h-64 overflow-hidden rounded-lg">
                                <Image
                                    alt="content"
                                    className="h-full w-full object-cover object-center"
                                    src="https://codebhaiya.s3.ap-south-1.amazonaws.com/mygears/maono-au-a04.webp"
                                    width={679}
                                    height={715}
                                />
                            </div>
                            <h2 className="title-font mt-5 text-xl font-medium text-gray-900 dark:text-gray-100">
                                MAONO AU-A04 Condenser USB Microphone
                            </h2>
                            <p className="mt-2 text-base leading-relaxed dark:text-gray-400">
                                {" "}
                                This is my main microphone, and I got this back in 2022. Before this, I used BOYA-BY M! to record the videos, but I wanted to upgrade, so I bought this microphone. I have used it for all of my videos since then. This microphone has a crisp audio quality and good noise suppression.
                            </p>
                            <a
                                href="https://amzn.in/d/8YxOGVy"
                                target="_blank"
                                rel="noreferrer"
                                className="my-1 mr-2 inline-flex w-fit cursor-pointer items-center rounded-full bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-lg transition ease-in-out hover:scale-105 hover:bg-blue-800"

                            >
                                {" "}
                                View on Amazon{" "}
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="ml-2 h-4 w-4"
                                    viewBox="0 0 24 24"
                                >
                                    {" "}
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>

                    </div>




                </div>


            </div>
        </section>
    )
}

export default Gears