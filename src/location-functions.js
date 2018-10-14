import countryCodes from './country-codes.json'

export function getCountryCode (country) {
  const countryInfo = countryCodes.find(c => caseEqual(c.name, country))
  if (countryInfo === undefined) {
    return false
  }
  const countryCode = countryInfo['alpha-2']
  return countryCode
}

export function caseEqual(string1, string2) {
  return string1.toUpperCase() === string2.toUpperCase();
}
