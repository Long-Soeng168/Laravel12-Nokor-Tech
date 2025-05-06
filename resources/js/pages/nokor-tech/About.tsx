import { usePage } from '@inertiajs/react';
import NokorTechLayout from './layouts/nokor-tech-layout';

const About = () => {
    const { aboutPages } = usePage().props;

    return (
        <NokorTechLayout>
            <div>
                {aboutPages.map((page, index) => (
                    <div
                        key={page.id}
                        className={`${index % 2 !== 0 ? 'bg-black bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)] text-white' : 'bg-background text-foreground'}`}
                    >
                        <div
                            className={`mx-auto flex max-w-7xl flex-col items-center justify-between px-4 py-16 md:flex-row ${
                                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                            } lg:px-24`}
                        >
                            {/* Image */}
                            <div className="order-2 mt-8 flex w-full items-center justify-center lg:order-1 lg:mt-0 lg:w-auto">
                                {page?.images && page?.images[0] && (
                                    <div className="relative flex h-[300px] w-[300px] items-center justify-center lg:h-[500px] lg:w-[500px]">
                                        <img
                                            src={`/assets/images/pages/thumb/${page.images[0].image}`}
                                            alt=""
                                            className="object-cover"
                                            style={{ width: '60%', height: '60%' }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Text */}
                            <div className="w-full lg:w-1/2 lg:pr-16">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-4xl font-semibold lg:text-5xl">{page.title}</h3>
                                </div>
                                <div
                                    className={`prose ck-content mt-4 max-w-md text-lg ${index % 2 === 0 ? 'text-foreground' : 'text-white'} lg:text-xl`}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: page.long_description }} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </NokorTechLayout>
    );
};

export default About;
