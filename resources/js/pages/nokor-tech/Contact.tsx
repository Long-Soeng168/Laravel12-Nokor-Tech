
import { usePage } from '@inertiajs/react';
import { ArrowRight, Globe2Icon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import SectionHeader from './components/section-header';
import NokorTechLayout from './layouts/nokor-tech-layout';
import ContactFormSubmit from './components/contact-form-submit';

const ContactCamActivePage = () => {
    const { application_info, contactPage, app_url } = usePage().props;

    return (
        <NokorTechLayout>
            <div className="flex min-h-screen items-center justify-center py-16">
                <div className="mx-auto w-full max-w-screen-xl px-6 xl:px-0">
                    <div className="text-center">
                        <SectionHeader label="Contact Us" title={contactPage?.title} />
                        <div className={`prose ck-content mx-auto mt-4 max-w-xl text-center text-lg lg:text-xl`}>
                            <div dangerouslySetInnerHTML={{ __html: contactPage?.long_description }} />
                        </div>
                    </div>

                    <div className="mt-24 grid gap-16 md:gap-10 lg:grid-cols-2">
                        {/* Contact Info */}
                        <div className="grid grid-cols-1 content-start h-auto gap-x-8 gap-y-12 sm:grid-cols-2">
                            <div>
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                    <MapPinIcon />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">Address</h3>
                                <a className="text-primary font-medium" href={`#`}>
                                    {application_info?.address}
                                </a>
                            </div>
                            <div>
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                    <PhoneIcon />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">Phone</h3>
                                <a className="text-primary font-medium" href={`tel:${application_info?.phone}`}>
                                    {application_info?.phone}
                                </a>
                            </div>
                            <div>
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                    <MailIcon />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">Email</h3>
                                <a className="text-primary font-medium" href={`mailto:${application_info?.email}`}>
                                    {application_info?.email}
                                </a>
                            </div>

                            <div>
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                    <Globe2Icon />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">Website</h3>
                                <a className="text-primary font-medium" href={app_url}>
                                    {app_url}
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                       <ContactFormSubmit />
                    </div>
                </div>
            </div>
            <div>
                <iframe className='h-[400px]' src={application_info?.google_map} width="100%" height="100%" loading="lazy"></iframe>
            </div>
        </NokorTechLayout>
    );
};

export default ContactCamActivePage;
