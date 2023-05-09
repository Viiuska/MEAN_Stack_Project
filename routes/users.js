const express = require('express');
const router = express.Router()
const passport = require('passport')
const jwt = require("jsonwebtoken");
const User = require('../models/user')
const Book = require('../models/book')
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const inventory = require('../routes/inventory')

/*
Book.create({
  title:"Don Quixote",
  author:"Miguel de Cervantes",
  genre:"Novel, Classics, Fiction, Parody",
  description:"Don Quixote has become so entranced by reading chivalric romances that he determines to become a knight-errant himself. In the company of his faithful squire, Sancho Panza, his exploits blossom in all sorts of wonderful ways. While Quixote's fancy often leads him astray—he tilts at windmills, imagining them to be giants—Sancho acquires cunning and a certain sagacity. Sane madman and wise fool, they roam the world together, and together they have haunted readers' imaginations for nearly four hundred years."
},{
  title:"Lord of the Rings",
  author:"J.R.R. Tolkien",
  genre:"Fantasy, Classics, Fiction, Adventory",
  description:"In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins."
},{
  title:"Harry Potter and the Sorcerer's Stone",
  author:"J.K. Rowling",
  genre:"Fantasy, Adventure, Fiction",
  description:"Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were. But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright. From the surprising way he is greeted by a lovable giant, to the unique curriculum and colorful faculty at his unusual school, Harry finds himself drawn deep inside a mystical world he never knew existed and closer to his own noble destiny."
},{
  title:"And Then There Were None",
  author:"Agatha Christie",
  genre:"Classics, Fiction, Crime, Mystery",
  description:"First, there were ten—a curious assortment of strangers summoned as weekend guests to a little private island off the coast of Devon. Their host, an eccentric millionaire unknown to all of them, is nowhere to be found. All that the guests have in common is a wicked past they're unwilling to reveal—and a secret that will seal their fate. For each has been marked for murder. A famous nursery rhyme is framed and hung in every room of the mansion:"
},{
  title:"Alice's Adventures in Wonderland",
  author:"Lewis Carroll",genre:"Classics, Fantasy, Fiction, Adventure", description:"With the curious, quick-witted Alice at its heart, readers will not only rediscover characters such as the charming White Rabbit, the formidable Queen of Hearts, the Mad Hatter and the grinning Cheshire Cat but will find fresh and wonderful creations of these characters by a true master of his art,; images that will live in our hearts and minds for generations to come."
},{
  title:"The Lion, the Witch, and the Wardrobe",
  author:"C.S. Lewis",genre:"Fantasy, Fiction, Classics, Adventure", description:"Lucy is the first to find the secret of the wardrobe in the professor's mysterious old house. At first her brothers and sister don't believe her when she tells of her visit to the land of Narnia. But soon Edmund, then Peter and Susan step through the wardrobe themselves. In Narnia they find a country buried under the evil enchantment of the White Witch. When they meet the Lion Aslan, they realize they've been called to a great adventure and bravely join the battle to free Narnia from the Witch's sinister spell."
},{
  title:"Pinocchio",
  author:"Carlo Collodi",genre:"Classics, Fantasy, Adventure, Childrens", description:"Pinocchio has a good heart, but he is disobedient and lazy and often has poor judgment. And when he lies, Pinocchio's nose grows longer! Follow this mischievous puppet as he goes to the 'Field of Miracles', where he plants gold coins to try to make his wealth grow. Thrill as he is pursued by assassins. And marvel as he becomes the unwitting star of a circus show and lives a life of ease in the 'Land of Boobies,' where boys can play all day and never have to go to school. Of course, Pinocchio gets into trouble along the way."
},{
  title:"Catcher in the Rye",
  author:"J.D. Salinger",genre:"Classics, Fiction, Novels, Young Adult", description:"Fleeing the crooks at Pencey Prep, he pinballs around New York City seeking solace in fleeting encounters—shooting the bull with strangers in dive hotels, wandering alone round Central Park, getting beaten up by pimps and cut down by erstwhile girlfriends. The city is beautiful and terrible, in all its neon loneliness and seedy glamour, its mingled sense of possibility and emptiness. Holden passes through it like a ghost, thinking always of his kid sister Phoebe, the only person who really understands him, and his determination to escape the phonies and find a life of true meaning."
},{
  title:"Anne of Green Gables",
  author:"L. M. Montgomery",genre:"Classics, Fiction, Childrens, Historical Fiction", description:"This heartwarming story has beckoned generations of readers into the special world of Green Gables, an old-fashioned farm outside a town called Avonlea. Anne Shirley, an eleven-year-old orphan, has arrived in this verdant corner of Prince Edward Island only to discover that the Cuthberts—elderly Matthew and his stern sister, Marilla—want to adopt a boy, not a feisty redheaded girl. But before they can send her back, Anne—who simply must have more scope for her imagination and a real home—wins them over completely. A much-loved classic that explores all the vulnerability, expectations, and dreams of a child growing up, Anne of Green Gables is also a wonderful portrait of a time, a place, a family… and, most of all, love."
},{
  title:"Twenty Thousand Leagues Under the Sea",
  author:"Jules Verne",genre:"Classics, Fiction, Adventure, Fantasy", description:"When an unidentified “monster” threatens international shipping, French oceanographer Pierre Aronnax and his unflappable assistant Conseil join an expedition organized by the US Navy to hunt down and destroy the menace. After months of fruitless searching, they finally grapple with their quarry, but Aronnax, Conseil, and the brash Canadian harpooner Ned Land are thrown overboard in the attack, only to find that the “monster” is actually a futuristic submarine, the Nautilus, commanded by a shadowy, mystical, preternaturally imposing man who calls himself Captain Nemo. Thus begins a journey of 20,000 leagues—nearly 50,000 miles—that will take Captain Nemo, his crew, and these three adventurers on a journey of discovery through undersea forests, coral graveyards, miles-deep trenches, and even the sunken ruins of Atlantis. "
},{
  title:"It Ends with Us",
  author:"Colleen Hoover",genre:"Romance, Fiction, Contemporary", description:"Lily hasn’t always had it easy, but that’s never stopped her from working hard for the life she wants. She’s come a long way from the small town in Maine where she grew up — she graduated from college, moved to Boston, and started her own business. So when she feels a spark with a gorgeous neurosurgeon named Ryle Kincaid, everything in Lily’s life suddenly seems almost too good to be true."
},{
  title:"Magic Hour",
  author:"Kristin Hannah",genre:"Romance, Fiction, Mystery, Drama", description:"Dr. Julia Cates was one of the country's preeminent child psychiatrists until a shocking tragedy ruined her career. Retreating to her small western Washington hometown, Julia meets an extraordinary six-year-old girl who has inexplicably emerged from the deep woods nearby—a child locked in a world of unimaginable fear and isolation. To Julia, nothing is more important than saving the girl she now calls Alice. But Julia will need help from others, including the sister she barely knows and a handsome doctor with secrets of his own. What follows will test the limits of Julia's faith and strength, as she struggles to find a home for Alice . . . and for herself."
},{
  title:"Percy Jackson and the Lightning Thief",
  author:"Rick Riordan",genre:"Adventure, Fantasy, Mythology, Mystery",
  description:"Twelve-year-old Percy Jackson is on the most dangerous quest of his life. With the help of a satyr and a daughter of Athena, Percy must journey across the United States to catch a thief who has stolen the original weapon of mass destruction — Zeus’ master bolt. Along the way, he must face a host of mythological enemies determined to stop him. Most of all, he must come to terms with a father he has never known, and an Oracle that has warned him of betrayal by a friend."
}
)*/


router.post('/register', (req, res, next)=>{
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err){res.json({success:false, msg:"Failed to register"})}
            User.create({
                name:req.body.name,
                email:req.body.email,
                username:req.body.username,
                password:hash
            }
            ).then(result =>{
                res.json({success:true, msg:"User registered"})
            })
        })
    })
})


router.post('/authenticate', (req, res, next)=>{
    User.findOne({username: req.body.username}, (err, user) => {
      if(err) {
        throw err
      };
      if(!user){
        return res.json({success:false, msg:"User not found"})
      }
      else{
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if(err) throw err
            if(isMatch) {
              const token = jwt.sign({user}, config.secret,{  //user needs {} because the way we sign our token
                expiresIn:604800  //week
              })
              res.json({
                success:true, 
                token: 'JWT '+ token,
                user:{
                  id:user._id,
                  name:user.name,
                  username:user.username,
                  email:user.email
                }
              })
            }else{
              return res.json({success:false, msg:"Wrong password or username"})
            }
          })
      }
  })

})

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    res.json({user:req.user})
})

router.post('/dashboard', (req, res, next)=>{
  Book.findOne({title: req.body.title}, (err, book)=>{
    if(err){
      throw err;
    }
    if(book){
      return res.json({success: false, msg: "Book already exists"})
    }else{
      Book.create({
          title:req.body.title,
          author:req.body.author,
          genre:req.body.genre,
          description:req.body.description
        }).then(result =>{
            res.json({success:true, msg:"Book added"})
        })
    }
  })
})

router.route('/dashboard/:title').post(inventory.findOneBook);

module.exports=router