export interface ProductAndServicesProps {
    object: {
        slug: string;
        title: string;
        metadata: {
            produto: Produto[];
        }
    }
}

interface Produto {
    product_name: string;
    product_image: ImageProps;
    description: string;
}

interface ImageProps {
    url: string;
    imgix_url: string;
}