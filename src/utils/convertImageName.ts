
const setConverter: any = {
    FAMILY_CARD : 'Family'
}

export default  function convertImageName(imageName: string): string {
    if(imageName in setConverter) {imageName = setConverter[imageName]}
    const replaceUnderScore = imageName.replace('_', ' ')
    return replaceUnderScore?.toLocaleUpperCase();
}