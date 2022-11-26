# SmartBuilding

    if (temperature < 18) {
      if (humidity <= 60) return "warning";
      else if (humidity <= 80) return "info";
      else return "warning";
    } else if (temperature < 21) {
      if (humidity <= 50) return "warning";
      else if (humidity <= 70) return "info";
      else return "warning";
    } else if (temperature < 24) {
      if (humidity <= 40) return "warning";
      else if (humidity <= 60) return "info";
      else return "warning";
    } else {
      if (humidity <= 30) return "warning";
      else if (humidity <= 50) return "info";
      else return "warning";
    }
