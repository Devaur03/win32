const diseases = require('../data/diseases.json');  // Adjust the path if necessary

exports.getResults = (req, res) => {
  const symptomsInput = req.body.symptoms;
  // Convert user input to an array, trim, and lowercase all elements
  const inputSymptoms = symptomsInput.split(",").map(s => s.trim().toLowerCase());

  // Create an object to store combined disease info by name
  const diseaseInfo = {};

  // Loop through the diseases to find matches and merge info for diseases with the same name
  diseases.forEach(disease => {
    if (Array.isArray(disease.symptoms) && disease.symptoms.some(symptom => 
      inputSymptoms.includes(symptom.trim().toLowerCase())
    )) {
      const diseaseName = disease.name;

      if (!diseaseInfo[diseaseName]) {
        // If this disease is not already in the object, add it
        diseaseInfo[diseaseName] = {
          name: diseaseName,
          treatment: disease.treatment || [],
          causes: disease.causes || [],
          precautions: disease.precautions || [],
          symptoms: disease.symptoms || []
        };
      } else {
        // If the disease is already present, merge the new information
        diseaseInfo[diseaseName].treatment = [...new Set([...diseaseInfo[diseaseName].treatment, ...disease.treatment])];
        diseaseInfo[diseaseName].causes = [...new Set([...diseaseInfo[diseaseName].causes, ...disease.causes])];
        diseaseInfo[diseaseName].precautions = [...new Set([...diseaseInfo[diseaseName].precautions, ...disease.precautions])];
        diseaseInfo[diseaseName].symptoms = [...new Set([...diseaseInfo[diseaseName].symptoms, ...disease.symptoms])];
      }
    }
  });

  // Convert the merged diseaseInfo object back to an array for rendering
  const results = Object.values(diseaseInfo);

  res.render("result", { results });
};
