interface GIFInfo {
    type: string,
    id: string,
    url: string,
    embed_url: string,
    images: {
        fixed_height: {url: string},
    },
}

export interface FetchResponse extends Array<GIFInfo>{}