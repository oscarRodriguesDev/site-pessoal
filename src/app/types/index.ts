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
    link: string; // Campo adicionado para refletir o JSON atualizado
    text_hover:string;
}

interface ImageProps {
    url: string;
    imgix_url: string;
}
