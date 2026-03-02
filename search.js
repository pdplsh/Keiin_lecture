const contentArea = document.getElementById('content_search');
const originalHTML = contentArea.innerHTML;

function highlightText() {
  event.preventDefault();
  const searchInput = document.getElementById('searchInput');
  const keyword = searchInput.value.trim();
  if (!keyword) {
    resetText();
    return;
  }
  const regex = new RegExp(keyword, 'gi');
  const newHTML = originalHTML.replace(regex, (match) => {
    return `<mark style="background-color: yellow; font-weight: bold;">${match}</mark>`;
  });

  contentArea.innerHTML = newHTML;
}

function resetText() {
  contentArea.innerHTML = originalHTML;
  document.getElementById('searchInput').value = '';
}
const supabaseUrl = 'https://nynzqvazavclibaicymd.supabase.co';
const supabaseKey = 'sb_publishable_2r8EkDOZhv_XdFK-OfRX-g_mvRCOAc-';
const client = supabase.createClient(supabaseUrl, supabaseKey);

async function signInWithGithub() {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'https://pdplsh.github.io/Keiin_lecture/',
    },
  });
}
document.querySelector('#login').addEventListener('click', signInWithGithub);

async function checkLogin() {
  const authInfo = await client.auth.getSession();
  const session = authInfo.data.session;
  document.querySelector('#login').style.display = 'none';
  document.querySelector('#logout').style.display = 'none';
  if (session === null) {
    document.querySelector('#login').style.display = 'inline';
  } else {
    document.querySelector('#logout').style.display = 'inline';
  }
}
checkLogin();
async function signOut() {
  const { error } = await client.auth.signOut();
  checkLogin();
}
document.querySelector('#logout').addEventListener('click', signOut);

const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;
  const comment = document.getElementById('comment').value;

  const { data, error } = await client.from('comment').insert([
    {
      name: name,
      age: parseInt(age),
      email: email,
      comment: comment,
    },
  ]);

  if (error) {
    console.error('Error:', error.message);
    alert('Error: ' + error.message);
  } else {
    alert('Sucess!');
    form.reset();
  }
});
