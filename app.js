// Função para alternar entre tema claro e escuro
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// Função para abrir/fechar o carrinho (versão inicial)
function toggleCart() {
    let cart = document.getElementById("cartOverlay");
    cart.style.display = cart.style.display === "block" ? "none" : "block";
}

// Array que guardará os itens do carrinho
let cart = [];

// Abre/fecha carrinho (segunda versão — mesma função)
function toggleCart() {
  const cartOverlay = document.getElementById("cartOverlay");
  cartOverlay.style.display = cartOverlay.style.display === "block" ? "none" : "block";
}

// Função para adicionar item ao carrinho
function addToCart(nome, preco) {

  // Verifica se o item já existe no carrinho
  const itemExistente = cart.find(item => item.nome === nome);

  // Abre o carrinho ao adicionar item
  toggleCart();

  // Se já existe, aumenta a quantidade
  if (itemExistente) {
    itemExistente.quantidade++;

  // Caso contrário, adiciona como novo item
  } else {
    cart.push({
      nome,
      preco,
      quantidade: 1
    });
  }

  // Atualiza o carrinho visualmente
  updateCart();

  // Abre/fecha novamente (parece ser intencional pro layout)
  toggleCart();
}

// Remove um item inteiro do carrinho pelo índice
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Altera a quantidade de um item (incrementa ou reduz)
function changeQuantity(index, delta) {

  // Muda a quantidade
  cart[index].quantidade += delta;

  // Se quantidade chegou a zero ou menos, remove
  if (cart[index].quantidade <= 0) {
    cart.splice(index, 1);
  }

  // Atualiza o carrinho
  updateCart();
}

// Atualiza toda a interface do carrinho
function updateCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  // Limpa o conteúdo atual
  cartItemsDiv.innerHTML = "";

  let total = 0;

  // Para cada item no carrinho…
  cart.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    // Cria um elemento visual para o item
    const div = document.createElement("div");
    div.classList.add("cartItem");

    // Conteúdo HTML do item
    div.innerHTML = `
      <p><strong>${item.nome}</strong></p>
      <p>Preço: R$ ${item.preco.toFixed(2)}</p>
      <p>Quantidade:
        <button onclick="changeQuantity(${index}, -1)">-</button>
        ${item.quantidade}
        <button onclick="changeQuantity(${index}, 1)">+</button>
      </p>
      <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
      <button onclick="removeItem(${index})">Remover</button>
      <hr>
    `;

    // Adiciona no carrinho na tela
    cartItemsDiv.appendChild(div);
  });

  // Atualiza o valor total do carrinho
  cartTotal.innerText = "Total: R$ " + total.toFixed(2);
}

// Lógica para abrir/fechar o menu mobile
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});
