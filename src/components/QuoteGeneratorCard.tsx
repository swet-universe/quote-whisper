import React, { useEffect, useState } from 'react';

interface IQuotesData {
    data?: any;
    getQuotesData: (value?: string) => void;
}

export const QuoteGeneratorCard = (props: IQuotesData) => {
    const { data, getQuotesData } = props;
    const [tagsData, setTagsData] = useState([] as any);
    const [selectedTag, setSelectedTag] = useState('' as String);

    const getTagsData = async () => {
        try {
            const response = await fetch(`https://api.quotable.io/tags`);
            if (!response.ok) {
                throw new Error('Error in getting response!');
            }
            const responseJson = await response.json();
            setTagsData(responseJson);

        } catch (error) {
            console.error("Error while getting data: ", error);
        }
    };

    useEffect(() => {
        getTagsData();
    }, []);

    const handleTagClick = async (tag: any) => {
        setSelectedTag(tag?.name as string);
        getQuotesData(tag?.name as string);
    };

    return (
        <div className='container mx-auto '>
            {tagsData && tagsData?.map((tag: any, index: number) => (
                <span key={index} className="m-0.5 transition-all border bg-blue-400 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-8 items-center text-sm pl-2 rounded-md px-4">
                    <button
                        type="button"
                        className='mx-2'
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag?.name}
                    </button>
                </span>
            ))}

            <div className='text-lg py-4'>
                {data.length > 0 ?
                    <>
                        <span className='text-blue-500'>
                            Here Quotes on <em className='font-bold'> {selectedTag} </em>...
                        </span>
                        {data?.map((item: any) => {
                            return (
                                <>
                                    <p className='text-lg py-2'> {item?.content} </p>
                                </>
                            )
                        })}
                    </>
                    :

                    <span className='text-gray-700'> {selectedTag ? "No Quote Found! Keep Smiling!!!" : ""}</span>
                }
            </div>

        </div>

    );
};