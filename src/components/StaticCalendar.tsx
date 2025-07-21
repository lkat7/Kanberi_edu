const StaticCalendar = () => {
  const schedule = {
    "Lundi 14 juillet": [
      { heure: "08h00 - 10h00", cours: "Français - 6ème A" },
      { heure: "10h00 - 12h00", cours: "Histoire - 5ème B" },
      { heure: "13h00 - 14h00", cours: "Pause / Préparation" },
      { heure: "14h00 - 16h00", cours: "Maths - 4ème A" },
    ],
    "Mardi 15 juillet": [
      { heure: "08h00 - 10h00", cours: "Français - 6ème B" },
      { heure: "10h00 - 12h00", cours: "Français - 5ème A" },
      { heure: "13h00 - 16h00", cours: "Correction devoirs" },
    ],
    "Mercredi 16 juillet": [
      { heure: "08h00 - 10h00", cours: "Histoire - 5ème C" },
      { heure: "10h00 - 12h00", cours: "Français - 4ème B" },
    ],
    "Jeudi 17 juillet": [
      { heure: "08h00 - 10h00", cours: "Maths - 6ème A" },
      { heure: "10h00 - 12h00", cours: "Français - 5ème B" },
      { heure: "13h00 - 16h00", cours: "Réunion pédagogique" },
    ],
    "Vendredi 18 juillet": [
      { heure: "08h00 - 10h00", cours: "Français - 4ème A" },
      { heure: "10h00 - 12h00", cours: "Français - 6ème A" },
      { heure: "13h00 - 14h00", cours: "Pause / Préparation" },
      { heure: "14h00 - 16h00", cours: "Correction devoirs" },
    ],
  };

  return (
    <div className="space-y-6">
      {Object.entries(schedule).map(([jour, cours], index) => (
        <div key={index} className="bg-gray-50 border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">{jour}</h2>
          <ul className="space-y-1">
            {cours.map((c, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="font-medium">{c.heure}</span>
                <span>{c.cours}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StaticCalendar;
