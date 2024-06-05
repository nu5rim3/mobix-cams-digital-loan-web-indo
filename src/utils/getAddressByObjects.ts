interface AddressObject {
    [key: string]: string;
  }
  
export default  function formatAddress(addressObject: AddressObject): string {
    const addressArray = Object.values(addressObject);
    const addressString = addressArray.join(', ') + '.';
    return addressString;
  }