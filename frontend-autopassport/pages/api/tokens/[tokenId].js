import { tokenMetadata } from '../../../mocks/tokenMetadata'

export default async function tokenMetadataHandler(req, res) {
    const response = await res.status(200).json(tokenMetadata())
    return response;
}