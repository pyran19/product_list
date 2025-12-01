const csvUrl = "./data/article_list.csv"; // CSV のパス

Papa.parse(csvUrl, {
  download: true,
  header: true,
  complete: function(results) {
    const table = document.getElementById("table");
    const data = results.data;

    // ヘッダー生成
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    Object.keys(data[0]).forEach(key => {
      const th = document.createElement("th");
      th.textContent = key;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    // 行生成
    const tbody = document.createElement("tbody");
    data.forEach(row => {
      const tr = document.createElement("tr");
      Object.values(row).forEach(cell => {
        const td = document.createElement("td");

        // URLならリンク化
        if (typeof cell === "string" && cell.startsWith("http")) {
          const a = document.createElement("a");
          a.href = cell;
          a.textContent = cell;
          a.target = "_blank";
          td.appendChild(a);
        } else {
          td.textContent = cell;
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
  }
});