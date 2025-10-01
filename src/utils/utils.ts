// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function parseData(input: string): any[] {
//   // Split by delimiter and filter out empty parts
//   const parts = input.split('/split/').filter((part) => part.trim());

//   return parts.map((part) => {
//     try {
//       // Replace Python-like boolean, null, and escape characters with JavaScript equivalents
//       const normalizedPart = part
//         .replace(/True/g, 'true')
//         .replace(/False/g, 'false')
//         .replace(/None/g, 'null')
//         .replace(/'/g, '"'); // Convert single quotes to double quotes for valid JSON

//       // Attempt to parse the part as JSON
//       return JSON.parse(normalizedPart);
//     } catch (error) {
//       console.error('Failed to parse part:', part, 'Error:', error);
//       return null; // If parsing fails, return null
//     }
//   }).filter(Boolean); // Filter out any null values (failed parses)
// }
// export function parseData(input: string): any[] {
//   // Split by delimiter and filter empty parts
//   const parts = input.split('/split/').filter((part) => part.trim());

//   return parts
//     .map((part) => {
//       try {
//         // Skip if empty
//         if (!part.trim()) {
//           return null;
//         }

//         // Extract key and value using regex
//         const keyValueMatch = part.match(/{['"](.*?)['"]:\s*(.*?)}/s);
//         if (!keyValueMatch) {
//           return null;
//         }

//         const [, key, value] = keyValueMatch;

//         try {
//           // Try to parse the value as JSON
//           const parsedValue = JSON.parse(
//             value
//               .replace(/True/g, 'true')
//               .replace(/False/g, 'false')
//               .replace(/None/g, 'null')
//               .replace(/\\n/g, '\n')  // Convert \n string to actual newline
//               .replace(/\\t/g, '\t')  // Convert \t string to actual tab
//               .replace(/\\r/g, '\r')  // Convert \r string to actual carriage return
//               .replace(/'/g, '"')
//               .trim()
//           );

//           return { [key]: parsedValue };
//         } catch (parseError) {
//           // For string values that failed JSON parsing,
//           // directly process escape sequences
//           const processedValue = value
//             .replace(/^['"]/, '')     // Remove leading quotes
//             .replace(/['"]$/, '')     // Remove trailing quotes
//             .replace(/\\n/g, '\n')    // Convert \n string to actual newline
//             .replace(/\\t/g, '\t')    // Convert \t string to actual tab
//             .replace(/\\r/g, '\r')    // Convert \r string to actual carriage return
//             .replace(/\\\\/g, '\\')   // Handle escaped backslashes
//             .replace(/\\"/g, '"')     // Handle escaped quotes
//             .trim();

//           return { [key]: processedValue };
//         }

//       } catch (error) {
//         console.error('Failed to parse:', {
//           original: part,
//           error: error instanceof Error ? error.message : String(error),
//         });
//         return null;
//       }
//     })
//     .filter(Boolean); // Remove null entries
// }

// Function to check SQL validity


export function parseData(input: string): any[] {
  // Split input into lines and filter empty ones
  // This will handle both \n and \r\n line endings
  const lines = input
    .split(/\r?\n/)
    .filter(line => line.trim());

  return lines.map(line => {
    try {
      // Parse each line as a complete JSON object
      const parsed = JSON.parse(line);

      // Extract the nested data object if it exists
      if (parsed.data) {
        return parsed.data;
      }

      return parsed;
    } catch (error) {
      console.error('Failed to parse line:', {
        original: line,
        error: error instanceof Error ? error.message : String(error)
      });
      return null;
    }
  }).filter(Boolean); // Remove any null results
}

interface SQLQueryObject {
  sql_query: string;
  sql_valid?: boolean;  // Optional since not all objects have this
}
export const checkSQLObjValidity = (obj: SQLQueryObject): boolean => {
  if (('sql_valid' in obj) && ("sql_query" in obj)) {
      return true;
  }else{
    return false 
  }
};