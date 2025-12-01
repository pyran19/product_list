const csvUrl = "./data/article_list.csv"; // CSV のパス

Papa.parse(csvUrl, {
  download: true,
  header: true,
  complete: function(results) {
    const table = document.getElementById("table");
    const data = results.data;

    // CSV に URL 列があるが、表示は廃止してタイトルにリンクを付ける。
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    const keys = data && data.length ? Object.keys(data[0]).filter(k => k !== 'URL') : [];
    keys.forEach(key => {
      const th = document.createElement("th");
      th.textContent = key;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    // 行生成（URL 列は使わず、タイトル列のリンク先として使う）
    const tbody = document.createElement("tbody");
    data.forEach(row => {
      const tr = document.createElement("tr");
      keys.forEach(key => {
        const td = document.createElement("td");
        const cell = row[key] ?? '';

        // タイトル列（CSV のヘッダが日本語の "タイトル" の場合）には、同じ行の URL をリンク先にする
        if (key === 'タイトル') {
          const url = row['URL'];
          if (typeof url === 'string' && url.startsWith('http')) {
            const a = document.createElement('a');
            a.href = url;
            a.textContent = cell;
            a.target = '_blank';
            td.appendChild(a);
          } else {
            td.textContent = cell;
          }
        } else if (typeof cell === "string" && cell.startsWith("http")) {
          // その他のセルに URL が入っている場合は従来通りリンク化
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