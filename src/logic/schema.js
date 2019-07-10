const personType = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
    },
    // TODO: There are many more options that could be defined
    // (e.g. see https://schema.org/Person), we need to decide
    // how many to put into the spec.
  },
  "required": ["name"]
}

const privacyOptions = [
  "open", "private",
  "open_deidentified", "open_redacted"
]

const variableType = {
  "type": "object",
  "properties": {
    "@type": {
      "type": "string",
      "const": "PropertyValue"
    },
    "name": {
      "description": "Name of the variable (Identical to column header)",
      "type": "string",
    },
    "description": {
      "description": "Description of the variable (for humans)",
      "type": "string",
    },
    "type": {
      "description": "Data type of the variable",
      "type": "string",
      "enum": ["string", "int", "float", "bool"],
    },
    "privacy": {
      "description": "Name of the variable (Identical to column header)",
      "type": "string",
      "enum": privacyOptions
    },
    "propertyID": {
      "description": "URL pointing to a formal definition of this type of data in an ontology available on the web.",
      "type": "string",
      "format": "uri",
    },
    // TODO: Gave up at this point
  },
  "required": ["@type", "name"]
}

export const description = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/psych-ds.schema.json",
  "title": "Psych-DS metadata specification",
  "description": "A technical specification for psychological datasets",
  "type": "object",
  "properties": {
    "@type": {
      "description": "File type",
      "type": "string",
      "const": "Dataset"
    },
    "@context": {
      "description": "Schema context",
      "type": "string",
      "const": "https://schema.org/"
    },
    "name": {
      "description": "Name of the dataset",
      "type": "string",
    },
    "description": {
      "description": "Short description",
      "type": "string",
    },
    "schemaVersion": {
      "description": "Version of the data specification that this dataset conforms to",
      "type": "string",
    },
    "license": {
      "description": "Author-assigned ‘license’ for data/material use",
      "type": "string",
    },
    "author": {
      "description": "A list of people who contributed to the creation/curation of the dataset",
      "type": "array",
      "items": personType,
    },
    "creator": {
      "description": "A list of people who contributed to the creation/curation of the dataset",
      "type": "array",
      "items": personType,
    },
    "citation": {
      "description": "How researchers using this dataset should acknowledge the original authors",
      "type": "string",
    },
    "funder": {
      "description": "List of sources of funding (grant numbers)",
      "type": "array",
      "items": {
        "type": "string",
      },
    },
    "url": {
      "description": "List of references to publication that contain information on the dataset, or links",
      "type": "array",
      "items": {
        "type": "string",
        "format": "uri",
      },
    },
    "sameAs": {
      "description": "The DOI or other stable identifier of the dataset",
      "type": "string",
    },
    "privacyPolicy": {
      "description": "A string to indicate whether any of the values in the dataset are desired to be shareable",
      "type": "string",
      "enum": privacyOptions,
    },
    "variableMeasured": {
      "description": "If present, this field contains a series of objects, each of which is a variable",
      "type": "array",
      "items": variableType,
    },
    "temporalCoverage": {
      // TODO: Description missing
      "type": "string",
      "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}/[0-9]{4}-[0-9]{2}-[0-9]{2}$",
    },
    // TODO: spatialCoverage is not defined in the spec
    "datePublished": {
      // TODO: Description missing
      "type": "string",
      "format": "date",
    },
    "dateCreated": {
      // TODO: Description missing
      "type": "string",
      "format": "date",
    },
    // TODO: collectorTraining is not defined in the spec
  },
  required: [
    "@type",
    "@context",
    "name",
    "schemaVersion",
  ],
}
