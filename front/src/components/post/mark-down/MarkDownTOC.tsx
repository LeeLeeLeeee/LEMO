import React, { useEffect, useRef, useState } from 'react';

import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { useSelector } from 'react-redux';

import marked from '@/lib/lib';
import { CombinedState } from '@/stores/interface';

interface Props {
    code: string;
    trackingTitle: string;
}

const TocWrapper = styled.div(
    () => [tw`flex flex-col bg-white p-3 rounded-sm shadow-sm`],
    {
        '& > div ul': {
            fontSize: '.9rem',
            marginLeft: '20px',
            color: 'gray',
        },
    }
);

const TocTracker = styled.div((props: { visible: boolean }) => [
    tw`
    lg:pl-96
    lg:pr-96
    md:pl-10
    md:pr-10
    xs:pl-2
    xs:pr-2
    fixed
    p-2
    rounded-sm
    w-full
    ease-out
    bg-white/80
    `,
    {
        '& > h2': {
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        transition: 'top .3s',
        top: props.visible ? '0px' : '-60px',
    },
]);

function convertNodeListToTOC(elements: NodeListOf<Element>): string {
    if (elements.length === 0) return '';
    const tocText: string[] = [];
    const rootNodeLevel: number = +(elements[0]?.nodeName.slice(1) || 1);
    elements.forEach((element) => {
        const markdownSymbol = `- [${
            element.textContent
        }](#${element.getAttribute('id')})`;
        let tabLevel = '';
        const cLevel = +element.nodeName.slice(1);
        if (rootNodeLevel < cLevel) {
            tabLevel = Array(cLevel - rootNodeLevel)
                .fill('\t')
                .join('');
        } else if (rootNodeLevel > cLevel) {
            throw new Error('루트 노드 레벨보다 자식 노드 레벨이 큼');
        }

        tocText.push(`${tabLevel}${markdownSymbol}`);
    });

    return tocText.join('\n');
}

function MarkDownTOC(props: Props): JSX.Element {
    const { code, trackingTitle } = props;
    const tocElement = useRef<HTMLDivElement | null>(null);
    const [isTrackingMode, setIsTrackingMode] = useState<boolean>(false);
    const headerVisible = useSelector(
        (state: CombinedState) => state.setting.headerVisible
    );

    useEffect(() => {
        const codeHtml: string = marked(code);
        const doc = new DOMParser().parseFromString(codeHtml, 'text/html');
        const indexList = doc.querySelectorAll('h1, h2, h3');
        if (tocElement.current !== null) {
            try {
                tocElement.current.innerHTML = marked(
                    convertNodeListToTOC(indexList)
                );
            } catch (error) {
                tocElement.current.innerHTML = '';
            }
        }
    }, []);

    useEffect(() => {
        /* Tracking Mode setting */
        let intersectionObserver: undefined | IntersectionObserver;
        if (tocElement.current !== null) {
            intersectionObserver = new IntersectionObserver(
                (entries) => {
                    const [entry] = entries;
                    const { y = 0 } = entry?.boundingClientRect || {};
                    if (y < 1) {
                        setIsTrackingMode(true);
                    } else {
                        setIsTrackingMode(false);
                    }
                },
                { threshold: 1 }
            );
            intersectionObserver.observe(tocElement.current);
        }
        return () => {
            intersectionObserver?.disconnect();
        };
    }, []);

    return (
        <>
            <TocWrapper>
                <h3 className="text-xl font-bold">목차</h3>
                <div ref={tocElement} />
            </TocWrapper>
            {ReactDOM.createPortal(
                <TocTracker visible={isTrackingMode && !headerVisible}>
                    <h2>{trackingTitle}</h2>
                </TocTracker>,
                document.body
            )}
        </>
    );
}

export default React.memo(MarkDownTOC);
