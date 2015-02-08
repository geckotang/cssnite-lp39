class MarkdownRenderer < Redcarpet::Render::HTML

  def block_code(code, language)

		if language.class == NilClass
			language = ''
		end

    formatter = Rouge::Formatters::HTML.new(wrap: false)

    if language.include?('js')
      lexer = Rouge::Lexer.find('javascript')
      lang = 'javascript'
    elsif language.include?('html')
      lexer = Rouge::Lexer.find('html')
      lang = 'html'
    elsif language.include?('css')
      lexer = Rouge::Lexer.find('css')
      lang = 'css'
    else
      lexer = Rouge::Lexer.find(get_lexer(language))
      lang = language
    end

    if language and language.include?('example')
      if language.include?('js')
        #jsのプレビュー
        "
        <script>#{code}</script>
        <div class='sg-codeBlock'>
          <div class='sg-codeBlock__code  jsExample' data-lang='#{lang}'>
            <div class='highlight'><pre>#{formatter.format(lexer.lex(code))}</pre></div>
          </div>
        </div>
        "
      else
        #コードとプレビュー
        "
        <div class='sg-codeBlock'>
          <div class='sg-codeBlock__preview'>#{render_html(code, language)}</div>
          <div class='sg-codeBlock__code' data-lang='#{lang}'><div class='highlight'><pre>#{formatter.format(lexer.lex(code))}</pre></div></div>
        </div>
        "
      end
    else
      #コードのみ
      "
      <div class='sg-codeBlock'>
        <div class='sg-codeBlock__code'>
          <div class='highlight'><pre>#{formatter.format(lexer.lex(code))}</pre></div>
        </div>
      </div>
      "
    end
  end

  #hN要素
  def header(text, header_level)
    "<h#{header_level} class='sg-headingV#{header_level}'>#{text}</h#{header_level}>"
  end

  #hr要素
  def hrule()
    "<hr class='sg-hr'>"
  end

  #em要素
  def emphasis(text)
    "<span class='sg-text-italic'>#{text}</span>"
  end

  #strong要素
  def double_emphasis(text)
    "<span class='sg-text-bold'>#{text}</span>"
  end

  #下線
  def triple_emphasis(text)
    "<span class='sg-text-bolditalic'>#{text}</span>"
  end

  #a要素
  def link(link, title, content)
    "<a class='sg-textLink' href='#{link}' title='#{title}'>#{content}</a>"
  end

  #p要素
  def paragraph(text)
    "<p class='sg-paragraph'>#{text}</p>"
  end

  #blockquote要素
  def block_quote(quote)
    "<blockquote class='sg-blockquote'>#{quote}</blockquote>"
  end

  #code要素
  def codespan(code)
    "<code class='sg-code'>#{code}</code>"
  end

  #ul,ol要素
  def list(contents, list_type)
    tag = (list_type == :ordered) ? 'ol' : 'ul';
    "
    <#{tag} class='sg-list-#{list_type}'>
      #{contents}
    </#{tag}>
    "
  end

  #table,thead,tbody?
  def table(header, body)
    "
    <table class='sg-table'>
      <thead>#{header}</thead>
      <tbody>#{body}</tbody>
    </table>
    "
  end

  #img要素
  def image(link, title, alt_text)
    "<img class='sg-image' src='#{link}' title='#{title}' alt='#{alt_text}'>"
  end

  private
  def render_html(code, language)
    case language
      when 'haml_example'
        safe_require('haml', language)
        return Haml::Engine.new(code.strip).render(template_rendering_scope, {})
      else
        code
    end
  end

  def template_rendering_scope
    Object.new
  end

  def get_lexer(language)
    case language
      when 'haml_example'
        'haml'
      else
        'html'
    end
  end

  def safe_require(templating_library, language)
    begin
      require templating_library
    rescue LoadError
      raise "#{templating_library} must be present for you to use #{language}"
    end
  end

end
